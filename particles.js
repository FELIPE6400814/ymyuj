// Script para crear partículas en el fondo y efecto parallax
document.addEventListener('DOMContentLoaded', function() {
    // Crear el canvas para las partículas
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-background';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        pointer-events: none;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);
    
    // Crear capa de parallax
    const parallaxLayer1 = document.createElement('div');
    parallaxLayer1.className = 'parallax-layer layer-1';
    parallaxLayer1.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(circle at 20% 30%, rgba(84, 101, 178, 0.1) 0%, transparent 50%);
        z-index: -3;
        pointer-events: none;
    `;
    document.body.appendChild(parallaxLayer1);
    
    const parallaxLayer2 = document.createElement('div');
    parallaxLayer2.className = 'parallax-layer layer-2';
    parallaxLayer2.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(circle at 70% 60%, rgba(184, 193, 236, 0.08) 0%, transparent 60%);
        z-index: -4;
        pointer-events: none;
    `;
    document.body.appendChild(parallaxLayer2);
    
    // Número de partículas a crear
    const numParticles = 50;
    
    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
        createParticle();
    }
    
    // Efecto parallax al mover el mouse
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Mover las capas de parallax
        parallaxLayer1.style.transform = `translate(${mouseX * -30}px, ${mouseY * -30}px)`;
        parallaxLayer2.style.transform = `translate(${mouseX * -15}px, ${mouseY * -15}px)`;
    });
    
    // Efecto parallax al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        parallaxLayer1.style.top = `${scrollY * 0.05}px`;
        parallaxLayer2.style.top = `${scrollY * 0.02}px`;
    });
    
    function createParticle() {
        const particle = document.createElement('div');
        
        // Tamaño aleatorio entre 2 y 6px
        const size = Math.random() * 4 + 2;
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Velocidad aleatoria
        const speedX = (Math.random() - 0.5) * 0.2;
        const speedY = (Math.random() - 0.5) * 0.2;
        
        // Opacidad aleatoria
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Color aleatorio entre los azules de la paleta
        const colors = ['#5465b2', '#b8c1ec', '#2d3250'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Aplicar estilos
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            opacity: ${opacity};
            box-shadow: 0 0 ${size * 2}px ${color};
            transform: translate(-50%, -50%);
            transition: opacity 1s ease;
        `;
        
        // Añadir al contenedor
        particlesContainer.appendChild(particle);
        
        // Animar la partícula
        let currentX = posX;
        let currentY = posY;
        
        function animateParticle() {
            // Actualizar posición
            currentX += speedX;
            currentY += speedY;
            
            // Si la partícula sale de la pantalla, reposicionarla
            if (currentX < 0 || currentX > 100 || currentY < 0 || currentY > 100) {
                currentX = Math.random() * 100;
                currentY = Math.random() * 100;
            }
            
            // Aplicar nueva posición
            particle.style.left = `${currentX}%`;
            particle.style.top = `${currentY}%`;
            
            // Continuar animación
            requestAnimationFrame(animateParticle);
        }
        
        // Iniciar animación
        animateParticle();
    }
});
