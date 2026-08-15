import { json } from "@tanstack/react-start";

interface EnquiryData {
  name?: string;
  phone?: string;
  email?: string;
  requirement?: string;
}

export const POST = async (request: Request) => {
  try {
    const data: EnquiryData = await request.json();

    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.requirement) {
      return json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a production app, you would:
    // 1. Save to database
    // 2. Send email to admin
    // 3. Send confirmation email to customer

    // For now, we'll just log and return success
    console.log("New enquiry received:", {
      timestamp: new Date().toISOString(),
      ...data,
    });

    // TODO: Integrate with email service (SendGrid, Nodemailer, etc.)
    // TODO: Save to database

    return json(
      {
        success: true,
        message: "Enquiry received successfully",
        enquiry: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing enquiry:", error);
    return json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
};
