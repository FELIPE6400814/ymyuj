// Función para manejar el menú móvil
function setupMobileMenu() {
    console.log('Configurando menú móvil'); // Para depuración
    
    // Crear el botón de menú hamburguesa si no existe
    if (!document.querySelector('.menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(menuToggle);
        console.log('Botón de menú creado');
    }

    // Crear el overlay para cerrar el menú
    if (!document.querySelector('.menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        console.log('Overlay creado');
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');
    const overlay = document.querySelector('.menu-overlay');

    if (!menuToggle || !header || !overlay) {
        console.error('No se encontraron elementos necesarios para el menú móvil');
        return;
    }

    // Eliminar eventos anteriores para evitar duplicados
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    
    // Función para alternar el menú
    function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Toggle menu clicked');
        
        header.classList.toggle('expanded');
        document.body.classList.toggle('menu-expanded');
        
        // Mostrar/ocultar overlay
        if (header.classList.contains('expanded')) {
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'none';
        }
    }

    // Evento para el botón de menú
    newMenuToggle.addEventListener('click', toggleMenu);
    console.log('Evento click añadido al botón de menú');

    // Cerrar el menú al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        header.classList.remove('expanded');
        document.body.classList.remove('menu-expanded');
        overlay.style.display = 'none';
    });

    // Cerrar el menú al hacer clic en un enlace de navegación
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                header.classList.remove('expanded');
                document.body.classList.remove('menu-expanded');
                overlay.style.display = 'none';
            }
        });
    });
}

// Asegurarnos de que la función se ejecute cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, configurando menú móvil');
    setupMobileMenu();
    const navItems = document.querySelectorAll('.main-nav ul li a');
    const indicator = document.querySelector('.nav-indicator');
    
    // Función para posicionar el indicador
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

    // Configurar el menú móvil
    setupMobileMenu();
    
    // Se eliminó la llamada a checkLoginStatus()
});

// Modificar el script de scroll para que no afecte al menú en dispositivos móviles
window.addEventListener('scroll', function() {
    // Solo aplicar el efecto de ocultar en pantallas grandes
    if (window.innerWidth > 768) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
        const scrollThreshold = 50;
        
        // Determina si el usuario está desplazándose hacia arriba o hacia abajo
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Desplazamiento hacia abajo y más allá del umbral
            header.classList.add('hide');
        } else {
            // Desplazamiento hacia arriba o por encima del umbral
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    }
});
    
    // Formulario de sugerencias (solo en la página de sugerencias)
    const suggestionForm = document.getElementById('suggestionForm');
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', function(e) {
            // Removemos e.preventDefault() para permitir el envío del formulario
            // Solo mostramos el mensaje de agradecimiento
            alert('¡Gracias por tu sugerencia! La revisaremos lo antes posible.');
        });
    }

    // Se eliminaron todas las funciones relacionadas con login y registro

// También ejecutar la función ahora por si la página ya está cargada
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('Página ya cargada, configurando menú móvil inmediatamente');
    setupMobileMenu();
}