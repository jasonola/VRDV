SUN_RADIUS = 1392/2

d3.csv("planets.csv").then(donnees => {
    console.log(donnees)
    for(let i = 0; i<donnees.length; i++){
        console.log(donnees[i].planet, donnees[i].diameter)
    }
    let scene = document.querySelector("a-scene")
    let sun = document.createElement("a-sphere")
    
    sun.setAttribute("radius",SUN_RADIUS)
    sun.setAttribute("position","0 0 -10")
    sun.setAttribute("color", "orange")
    scene.appendChild(sun)

    for (let i = 0; i < donnees.length; i++) {
        let planet = document.createElement("a-sphere")
        planet.setAttribute("radius", donnees[i].diameter/1000)
        planet.setAttribute("position",`${SUN_RADIUS+ +donnees[i].distance_from_sun} 0 -10`)
        scene.appendChild(planet)
    }
    // let mercury = document.createElement("a-sphere")
    // mercury.setAttribute("radius", donnees[0].diameter/1000)
    // mercury.setAttribute("position",`${SUN_RADIUS+ +donnees[0].distance_from_sun} 0 -10`)
    // console.log(SUN_RADIUS)
    // console.log(`${SUN_RADIUS+ +donnees[0].distance_from_sun} 0 -10`)
    // scene.appendChild(mercury)
})