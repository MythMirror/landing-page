"use server";

export async function subscribeToBrevo(formData: FormData) {
  const email = formData.get("email");
  const type = formData.get("type");
  const message = formData.get("message");
  const company = formData.get("company");

  if (!email) return { success: false, message: "Email é obrigatório." };

  // IDs das Listas no Brevo
  const listIds = type === "b2c" ? [3] : [4];

  // Dados a enviar
  const payload = {
    email: email,
    listIds: listIds,
    updateEnabled: true,
    attributes: {
      // Mapeie os atributos no Brevo
      COMPANY: company || "",
      MESSAGE: message || "",
      SOURCE: "Website MythMirror",
    },
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY as string,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Se o erro for "Contact already exists", podemos tratar como sucesso ou ignorar
      const errorData = await response.json();
      console.error("Brevo Error:", errorData);

      // Se quiser tratar erro específico:
      if (errorData.code === 'duplicate_parameter') return { success: true, message: "Já inscrito!" };

      return { success: false, message: "Erro ao inscrever. Tente novamente." };
    }

    return { success: true, message: "Inscrição realizada com sucesso!" };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, message: "Erro interno. Tente mais tarde." };
  }
}
