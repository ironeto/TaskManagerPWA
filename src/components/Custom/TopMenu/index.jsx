const Menu = ({hasMenu, hasArrowBack, hasImage}) => {
    return <>
        { hasMenu ? 'Exibe o menu' : null}
        { hasArrowBack ? 'Defina seta pra voltar' : null}
        { hasImage ? 'Exibe a imagem' : null}
    </>
}

export default Menu;