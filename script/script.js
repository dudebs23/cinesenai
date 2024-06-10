document.addEventListener("DOMContentLoaded", function() {
    const filmesList = document.getElementById("filmes-list");

    filmesList.addEventListener("click", function(event) {
        if (event.target.classList.contains("ver-secao")) {
            const filme = event.target.getAttribute("data-filme");
            openSeatingPage(filme);
        }
    });

    function openSeatingPage(filme) {
        // Abre uma nova janela para a página de seleção de poltronas
        window.open(`seating.html?filme=${filme}`, "_blank", "width=600,height=400");
    }
});
