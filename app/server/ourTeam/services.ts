import prisma from "@/lib/prisma";
import { MemberOrder, OurTeamCreateInput, OurTeamUpdateInput } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const addNewMember = async (data: OurTeamCreateInput) => {
  try {
    const highestDisplayOrder = await prisma.our_team.findMany({
      select: { display_order: true },
      orderBy: { display_order: "asc" },
    });

    console.log("highestDisplayOrder: ",highestDisplayOrder);
let maxOrder = 0;

    for (const item of highestDisplayOrder) {
  if (typeof item.display_order === "number") {
    if (item.display_order > maxOrder) {
      maxOrder = item.display_order;
    }
  }
}
    
    const nextDisplayOrder = maxOrder + 1;
    console.log("nextDisplayOrder: ",nextDisplayOrder);

    const result = await prisma.our_team.create({
      data: {
        ...data,
        display_order: nextDisplayOrder,
      },
    });

    revalidateTag("ourTeam", "max");

    return {
      data: result,
      message: "New Member Has Been Added Successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error: ", error);

    return {
      data: error,
      message: "Error In Adding The Member",
      status: 500,
    };
  }
};

export const getAllMembers = unstable_cache(
  async () => {
    try {
      const result = await prisma.our_team.findMany({
        orderBy: { display_order: "asc" },
      });
      return {
        data: result,
        message: "All Members",
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: "Error In Getting All Members",
        status: 500,
      };
    }
  },
  ["all-member"],
  {
    tags: ["ourTeam"],
  },
);

export const getMembersByMain = (main: boolean) =>
  unstable_cache(
    async (main: boolean) => {
      try {
        const result = await prisma.our_team.findMany({
          where: { main },
          orderBy: { display_order: "asc" },
        });
        return {
          data: result,
          message: main ? "All Main Members" : "All Not Main Members",
          status: 200,
        };
      } catch (error) {
        return {
          data: error,
          message: "Error In Getting Members",
          status: 500,
        };
      }
    },
    [`members-by-main-${main}`],
    {
      tags: ["ourTeam"],
    },
  );

export const getMemberById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.our_team.findUnique({ where: { id } });
        if (!result)
          return { data: null, message: "Member not found", status: 409 };
        return {
          data: result,
          message: "Member fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching member", status: 500 };
      }
    },
    [`member-by-id-${id}`],
    { tags: ["ourTeam"] },
  );

  return cachedFn();
};

export const updatMember = async (id: string, data: OurTeamUpdateInput) => {
  try {
    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing)
      return {
        data: null,
        message: "Member Not Found",
        status: 409,
      };
    const result = await prisma.our_team.update({ where: { id }, data });
    revalidateTag("ourTeam", "max");
    return {
      data: result,
      message: "The Member Has Been Updated Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Updating The Member",
      status: 201,
    };
  }
};

export const deleteMember = async (id: string) => {
  try {
    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing)
      return {
        data: null,
        message: "Member Not Found",
        status: 409,
      };
    const result = await prisma.our_team.delete({ where: { id } });
    const logoKey = existing.image?.split("/f/")[1];
    if (logoKey) {
      await utapi.deleteFiles(logoKey);
    }
    revalidateTag("ourTeam", "max");
    return {
      data: result,
      message: "Member Has Been Deleted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleting Member",
      status: 500,
    };
  }
};

export const getMemberNameIdAndImage = async () => {
  try {
    const result = await prisma.our_team.findMany({
      select: { id: true, name_en: true, image: true, display_order: true },
    });
    return {
      data: result,
      message: "Member orders updated successfully",
      status: 200,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error updating member orders",
      status: 500,
    };
  }
};

export const updateMemberOrder = async (members: MemberOrder[]) => {
  try {
    await prisma.our_team.updateMany({
      data: { display_order: null },
    });
    const queries = members.map((member) =>
      prisma.our_team.update({
        where: { id: member.id },
        data: { display_order: member.display_order },
      }),
    );

    await Promise.all(queries);
    revalidateTag("ourTeam", "max");
    return {
      message: "Member orders updated successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error updating member orders",
      status: 500,
    };
  }
};

export const getMembersByMainAndLocale = (main: boolean, locale: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.our_team.findMany({
          where: { main },
          orderBy: { display_order: "asc" },
        });

        if (!result) return { data: [], status: 200 };

        const translatedMembers = result.map((member) => ({
          id: member.id,
          name: locale === "en" ? member.name_en : member.name_ar,
          position: locale === "en" ? member.position_en : member.position_ar,
          description:
            locale === "en" ? member.description_en : member.description_ar,
          image: member.image,
          display_order: member.display_order,
          main: member.main,
        }));

        return {
          data: translatedMembers,
          message: `Members fetched successfully in ${locale}`,
          status: 200,
        };
      } catch (error) {
        console.error("Database Error:", error);
        return {
          data: [],
          message: "Error In Getting Members",
          status: 500,
        };
      }
    },
    [`members-${main}-${locale}`],
    {
      tags: ["ourTeam"],
    },
  );

export const getMainMembersByLocale = (locale: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.our_team.findMany({
          where: { main: true },
          orderBy: { display_order: "asc" },
          select: {
            name_en: true,
            name_ar: true,
            position_en: true,
            position_ar: true,
            image: true,
            id: true,
          },
        });

        if (!result) return { data: [], status: 200 };

        const translatedMembers = result.map((member) => ({
          id: member.id,
          name: locale === "en" ? member.name_en : member.name_ar,
          position: locale === "en" ? member.position_en : member.position_ar,
          image: member.image,
        }));

        return {
          data: translatedMembers,
          message: `Members fetched successfully in ${locale}`,
          status: 200,
        };
      } catch (error) {
        console.error("Database Error:", error);
        return {
          data: [],
          message: "Error In Getting Members",
          status: 500,
        };
      }
    },
    [`members-true-${locale}`],
    {
      tags: ["ourTeam"],
    },
  )();

export const getNotMainMembersByLocale = (locale: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.our_team.findMany({
          where: { main: false },
          orderBy: { display_order: "asc" },
           select: {
            name_en: true,
            name_ar: true,
            position_en: true,
            position_ar: true,
            image: true,
            id: true,
          },
        });

        if (!result) return { data: [], status: 200 };

        const translatedMembers = result.map((member) => ({
          id: member.id,
          name: locale === "en" ? member.name_en : member.name_ar,
          position: locale === "en" ? member.position_en : member.position_ar,
          image: member.image,
        }));

        return {
          data: translatedMembers,
          message: `Members fetched successfully in ${locale}`,
          status: 200,
        };
      } catch (error) {
        console.error("Database Error:", error);
        return {
          data: [],
          message: "Error In Getting Members",
          status: 500,
        };
      }
    },

    [`members-false-${locale}`],
    {
      tags: ["ourTeam"],
    },
  )();
