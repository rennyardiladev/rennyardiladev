'use server';

import { Resend } from 'resend';
import { revalidatePath } from 'next/cache';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  prev: { status: string } | null,
  formData: FormData
) {
  const nombre = (formData.get('nombre') as string)?.trim() ?? '';
  const email = (formData.get('email') as string)?.trim() ?? '';
  const mensaje = (formData.get('mensaje') as string)?.trim() ?? '';

  if (!nombre) {
    return { status: 'Error: El nombre es requerido.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'Error: Email inválido.' };
  }

  if (!mensaje) {
    return { status: 'Error: El mensaje es requerido.' };
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Sitio web <onboarding@resend.dev>',
      to: ['rennyardiladev@gmail.com'],
      subject: `Consulta de ${nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    if (error) {
      console.error(error);
      return { status: 'Error al enviar el mensaje. Inténtalo de nuevo.' };
    }

    revalidatePath('/');
    return { status: 'Mensaje enviado correctamente. Respondo en un día hábil.' };
  } catch (err) {
    console.error(err);
    return { status: 'Error al enviar el mensaje. Inténtalo de nuevo.' };
  }
}
