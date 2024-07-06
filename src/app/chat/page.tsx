import Chat from "@ui/chat/Chat";

// no funciona en navegadores sin webgpu
// hay que decir que solo funciona en local y que el modelo se va a descargar
// no funciona en telefonos
// https://github.com/mlc-ai/web-llm/blob/main/src/config.ts#L293

export default function ChatPage() {
  return (
    <section className="container px-4 py-2 mx-auto h-vh md:h-dvh md:min-h-vh">
      <Chat />
    </section>
  );
}
