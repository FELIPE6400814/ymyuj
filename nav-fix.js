// Script para corregir el bug del indicador de navegación
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.main-nav ul li a');
    const indicator = document.querySelector('.nav-indicator');
    
    // Función mejorada para posicionar el indicador
    function positionIndicator(element) {
        if (!element || !indicator) return;
        
        // Obtener las dimensiones del elemento y su contenedor padre
        const rect = element.getBoundingClientRect();
        const navRect = document.querySelector('.main-nav').getBoundingClientRect();
        
        // Calcular la posición relativa al contenedor de navegación
        const leftPosition = rect.left - navRect.left;
        
        // Aplicar dimensiones y posición con una transición suave
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${leftPosition}px`;
        indicator.style.display = 'block';
        indicator.style.opacity = '1';
    }
    
    // Posicionar el indicador en la página actual al cargar
    navItems.forEach(item => {
        if (item.classList.contains('active')) {
            positionIndicator(item);
        }
    });
    
    // Manejar eventos de mouse
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            positionIndicator(this);
        });
    });
    
    // Cuando el mouse sale del menú, volver al elemento activo
    const navContainer = document.querySelector('.main-nav ul');
    navContainer.addEventListener('mouseleave', function() {
        const activeItem = document.querySelector('.main-nav ul li a.active');
        if (activeItem) {
            positionIndicator(activeItem);
        } else {
            indicator.style.display = 'none';
        }
    });
    
    // Ajustar el indicador cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        const activeItem = document.querySelector('.main-nav ul li a.active');
        if (activeItem) {
            positionIndicator(activeItem);
        }
    });
});
