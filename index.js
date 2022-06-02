SUN_RADIUS_KM = 1392000/2/1000000
// Textures des planetes
ASSETS = "assets/"
PLANET_TEXTURES = ["mercury.jpeg","venus.jpeg", "earth.webp","mars.jpeg","jupiter.jpeg", "saturn.jpeg", "uranus.jpeg", "neptune.jpeg", "pluto.jpeg"]

// Charger les données (https://github.com/devstronomy/nasa-data-scraper/blob/master/data/csv/planets.csv)
d3.csv("planets.csv",function(d){
    return {
        // Selectionner et modifier les données qu'on veut, en restant cohérent avec les unités
        radius_km : +d.diameter/2/1000000,
        sun_dist_km : +d.distance_from_sun*10e6/1000000,
        planet : d.planet,
        orbital_period_days : +d.orbital_period,
        rotation_period_days : +d.rotation_period /24
    }
    // Promesse pour d'abord charger et ensuite exploiter les données
}).then(donnees => {
    
    // Selection de la scène pour ensuite y ajouter les differents éléments
    let scene = document.querySelector("a-scene")
    // Création du soleil et de la caméra
    let sun = document.createElement("a-sphere")    
    
    // Définir les caracteristiques du soleil et l'ajouter à la scène
    sun.setAttribute("radius",SUN_RADIUS_KM*10)
    sun.setAttribute("position","0 0 0")
    sun.setAttribute("id", "Sun")
    sun.setAttribute("src",ASSETS+"sun.jpeg")
    sun.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 100000; easing: linear")
    scene.appendChild(sun)
   

    // Boucle de création des planètes, chaque planète est positionnée par rapport à un centre qu'il faut à chaque fois définir sinon ça marche pas
    for (let i = 0; i < donnees.length; i++) {
        let planet = document.createElement("a-sphere")
        let center = document.createElement("a-entity")
        let text = document.createElement("a-text")
        
        center.setAttribute("position", "0 0 0")
        // C'est sur centre qu'on définit la vitesse d'orbite
        center.setAttribute("animation", `property: rotation; to: 0 360 0; loop: true; dur: ${donnees[i].orbital_period_days*1000} ; easing: linear`)
        planet.setAttribute("radius", +donnees[i].radius_km*50)
        planet.setAttribute("position",`${SUN_RADIUS_KM*10+ +donnees[i].sun_dist_km/100} 0 -10`)
        planet.setAttribute("id", donnees[i].planet)
        planet.setAttribute("number", i)

        // Apposer les textures correspondantes
        planet.setAttribute("src", ASSETS + PLANET_TEXTURES[i])
        // C'est sur planet qu'on définit la vitesse de rotation
        planet.setAttribute("animation", `property: rotation; to: 0 360 0; loop: true; dur: ${donnees[i].rotation_period_days*1000} ; easing: linear`)
        text.setAttribute("value", donnees[i].planet)
        text.setAttribute("position", `0 ${donnees[i].radius_km*50+1} 0`)
        text.setAttribute("align", "center")
        text.setAttribute("scale", "2 2 1")
        scene.appendChild(center)
        center.appendChild(planet)
        planet.appendChild(text)
        console.log(planet)
    }

    let infoWrapper = document.getElementById("planet_info")
    let title = document.createElement("h3")
    console.log(donnees[0])


    // Ajouter tableau planete sur le tableau de bord du cockpit
    // let tableWrapper = document.getElementById("planet_info")
    // let table = document.createElement('table');
    // let thead = document.createElement('thead');
    // let tbody = document.createElement('tbody');

    // table.appendChild(thead);
    // table.appendChild(tbody);
    // tableWrapper.appendChild(table)
    // console.log(donnees)
    
})