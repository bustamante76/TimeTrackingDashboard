let timeFrame = document.querySelectorAll('.timeframe');
let hrsCurrent = document.querySelectorAll('.hrs-current');
let hrsPrevious = document.querySelectorAll('.hrs-previus');

// Función para obtener los datos de data.json de forma asíncrona
// y manejar errores en caso de que la solicitud falle
const data = async function () {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Error al cargar data.json: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener datos: ', error);
        return null;
    }
}

// Función para actualizar los elementos hrsCurrent y hrsPrevious
// según el periodo seleccionado (daily, weekly, monthly)
function updateTimeframes(periodo = 'daily') {
    data().then(data => {
        if (data) {
            data.forEach((item, index) => {
                hrsCurrent[index].textContent = item.timeframes[periodo].current;
                hrsPrevious[index].textContent = item.timeframes[periodo].previous;
            });
        }
    }).catch(error => {
        console.error('Error al procesar los datos: ', error);
    });
}

// Inicializar el primer elemento como activo, mediante la clase 'active'
timeFrame[0].classList.add('active');
// Cargar datos para el primer elemento activo correspondiente al periodo 'daily'
updateTimeframes();

// Añadir evento de clic a cada elemento de timeFrame para cambiar la clase activa
// y actualizar el contenido de hrsCurrent y hrsPrevious
timeFrame.forEach((element) => {
    element.addEventListener('click', function () {
        // Eliminar la clase 'active' de todos los elementos
        timeFrame.forEach(item => item.classList.remove('active'));
        // Añadir la clase 'active' al elemento clicado
        this.classList.add('active');

        console.log('Elemento clicado:', this.dataset.timeframe);
        updateTimeframes(this.dataset.timeframe);

    });
});
