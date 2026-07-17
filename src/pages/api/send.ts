import type { APIRoute } from 'astro';

export const prerender = false;

// Destination email to receive notifications
const TO_EMAIL = 'wolfwaylogistics@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // Default sandbox domain from Resend. Change this once your domain is verified.

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get Resend API Key from environment variables
    const runtimeEnv = (locals as any)?.runtime?.env || {};
    const RESEND_API_KEY = runtimeEnv.RESEND_API_KEY || (import.meta.env.RESEND_API_KEY as string);

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined. Please set it in Cloudflare Pages environment variables.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service configuration missing. Please verify RESEND_API_KEY setting in Cloudflare dashboard.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse incoming form data
    const formData = await request.formData();
    const formType = formData.get('formType')?.toString() || 'contact';
    const name = formData.get('name')?.toString() || formData.get('contact_name')?.toString() || 'N/A';
    const email = formData.get('email')?.toString() || 'N/A';
    const phone = formData.get('phone')?.toString() || 'N/A';

    let subject = '';
    let emailHtml = '';

    if (formType === 'quote') {
      const company = formData.get('company')?.toString() || 'N/A';
      const origin = formData.get('pickup_location')?.toString() || 'N/A';
      const destination = formData.get('delivery_location')?.toString() || 'N/A';
      const equipmentType = formData.get('freight_type')?.toString() || 'N/A';
      const pickupDate = formData.get('pickup_date')?.toString() || 'N/A';
      const message = formData.get('message')?.toString() || 'N/A';

      subject = `[Quote Request] New Freight Rate Inquiry - ${name}`;
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #0d1527; border-bottom: 2px solid #00a8e1; padding-bottom: 10px;">New Freight Rate Inquiry</h2>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Pickup Location:</strong> ${origin}</p>
          <p><strong>Delivery Location:</strong> ${destination}</p>
          <p><strong>Freight / Trailer Type:</strong> ${equipmentType}</p>
          <p><strong>Target Pickup Date:</strong> ${pickupDate}</p>
          <p><strong>Additional Details:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    } else if (formType === 'driver') {
      const appType = formData.get('applying_as')?.toString() || 'N/A';
      const experience = formData.get('cdl_experience')?.toString() || 'N/A';
      const cityState = formData.get('location')?.toString() || 'N/A';
      const message = formData.get('message')?.toString() || 'N/A';

      subject = `[Driver Application] ${appType} - ${name}`;
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #0d1527; border-bottom: 2px solid #00a8e1; padding-bottom: 10px;">New Driver Quick Application</h2>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Applying As:</strong> ${appType}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>City / State:</strong> ${cityState}</p>
          <p><strong>CDL Experience:</strong> ${experience}</p>
          <p><strong>Experience / Equipment Details:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    } else if (formType === 'carrier') {
      const companyName = formData.get('company_name')?.toString() || 'N/A';
      const usdot = formData.get('usdot')?.toString() || 'N/A';
      const mc = formData.get('mc_number')?.toString() || 'N/A';
      const equipmentType = formData.get('equipment_type')?.toString() || 'N/A';
      const truckCount = formData.get('truck_count')?.toString() || 'N/A';
      const serviceArea = formData.get('states_covered')?.toString() || 'N/A';
      const message = formData.get('message')?.toString() || 'N/A';

      subject = `[Carrier Application] Partner Network - ${companyName}`;
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #0d1527; border-bottom: 2px solid #00a8e1; padding-bottom: 10px;">New Carrier Partner Application</h2>
          <p><strong>Company Name:</strong> ${companyName}</p>
          <p><strong>Contact Person:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>USDOT Number:</strong> ${usdot}</p>
          <p><strong>MC Number:</strong> ${mc}</p>
          <p><strong>Equipment Fleet Type:</strong> ${equipmentType}</p>
          <p><strong>Number of Trucks:</strong> ${truckCount}</p>
          <p><strong>States Covered:</strong> ${serviceArea}</p>
          <p><strong>Equipment / Capacity Details:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    } else {
      // General Contact Form
      const message = formData.get('message')?.toString() || 'N/A';
      subject = `[Contact Form] General Inquiry - ${name}`;
      emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #0d1527; border-bottom: 2px solid #00a8e1; padding-bottom: 10px;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `;
    }

    // Call Resend REST API directly
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `WolfWay Website <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        subject: subject,
        html: emailHtml,
        reply_to: email !== 'N/A' ? email : undefined,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API call failed:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'Email delivery failed. Please try again.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resData = await resendResponse.json();
    return new Response(
      JSON.stringify({ success: true, id: (resData as any).id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Server error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
