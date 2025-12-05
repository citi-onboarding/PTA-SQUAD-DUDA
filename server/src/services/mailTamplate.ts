export const mailTemplate = (nome: string) => {
    return`
        <html>
            <h1>Ola ${nome}, Tudo bem?</h1>
            <p>Consulta marcada com sucesso!</p>
            <hr>
            <h2>Seu comprovante:</h2>
        </html>`
}