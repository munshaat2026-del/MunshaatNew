import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendParkingRequestConfirmationEmail = async (email: string) => {

  try {
    await resend.emails.send({
      from: process.env.Email_From!,
      to: email,
      subject: "تأكيد استلام طلب الاشتراك في خدمة المواقف",
      html: `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f5f7fa;
              font-family: Arial, Tahoma, sans-serif;
              direction: rtl;
            "
          >
       
            <div
              style="
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
                overflow: hidden;
              "
            >

              <!-- Header -->
              <div
                style="
                  padding: 32px 30px;
                  background-color: #0a0f1a;
                  text-align: center;
                "
              >

                <!-- Logo -->
                <img
                  src="${process.env.COMPANY_LOGO_URL}"
                  alt="شركة المنشآت والمجمعات العقارية"
                  style="
                    display: block;
                    width: 90px;
                    max-width: 90px;
                    height: auto;
                    margin: 0 auto 18px;
                  "
                />

                <!-- Company Name -->
                <div
                  style="
                    color: #ffffff;
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 24px;
                  "
                >
                  شركة المنشآت والمجمعات العقارية
                </div>

                <!-- Divider -->
                <div
                  style="
                    width: 45px;
                    height: 2px;
                    background-color: #0c479a;
                    margin: 0 auto 22px;
                  "
                ></div>

                <!-- Email Title -->
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 22px;
                    line-height: 1.6;
                  "
                >
                  طلب الاشتراك في خدمة المواقف
                </h1>

              </div>

              <!-- Content -->
              <div
                style="
                  padding: 40px 30px;
                  text-align: right;
                  color: #334155;
                  line-height: 2;
                  font-size: 15px;
                "
              >
                <p style="margin: 0 0 18px;">
                  شكرًا لتقديم طلب الاشتراك في خدمة المواقف.
                </p>

                <p style="margin: 0 0 18px;">
                  تم استلام طلبكم بنجاح وإدراجه ضمن قائمة الانتظار،
                  وسيتم التعامل مع الطلبات وفقًا لأولوية التقديم وتوفر المواقف.
                </p>

                <p style="margin: 0;">
                  شكرًا لكم على ثقتكم، ونسعد بخدمتكم.
                </p>
              </div>

              <!-- Footer -->
              <div
                style="
                  padding: 20px 30px;
                  border-top: 1px solid #e5e7eb;
                  text-align: center;
                  color: #94a3b8;
                  font-size: 12px;
                  line-height: 1.8;
                "
              >
                شركة المنشآت والمجمعات العقارية
                <br />
                هذا البريد الإلكتروني تم إرساله تلقائيًا، يرجى عدم الرد عليه.
              </div>

            </div>
          </body>
        </html>
      `,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error sending parking request email:", error);

    return {
      success: false,
    };
  }
};
