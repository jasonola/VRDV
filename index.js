SUN_RADIUS_KM = 1392000/2/1000000
PLANET_COLORS = ["grey","#712d2d","#2525b6","#602424","#93622a","#b1911b","#91f8f8","#2a2aa7","grey"]
d3.csv("planets.csv",function(d){
    return {
        radius_km : +d.diameter/2/1000000,
        sun_dist_km : +d.distance_from_sun*10e6/1000000,
        planet : d.planet,
    }
}).then(donnees => {
    console.log(donnees)
    for(let i = 0; i<donnees.length; i++){
        console.log(donnees[i].planet, donnees[i].radius_km,+donnees[i].sun_dist_km)
    }
    let scene = document.querySelector("a-scene")
    let sun = document.createElement("a-sphere")
    
    sun.setAttribute("radius",SUN_RADIUS_KM)
    sun.setAttribute("position","0 0 -10")
    sun.setAttribute("color", "#fa5700")
    sun.setAttribute("id", "Sun")
    scene.appendChild(sun)
    console.log(sun)

    for (let i = 0; i < donnees.length; i++) {
        let planet = document.createElement("a-sphere")
        planet.setAttribute("radius", +donnees[i].radius_km)
        planet.setAttribute("position",`${SUN_RADIUS_KM+ +donnees[i].sun_dist_km/1000} 0 -10`)
        planet.setAttribute("id", donnees[i].planet)
        planet.setAttribute("color", PLANET_COLORS[i])
        scene.appendChild(planet)
        console.log(planet)
    }
    // let mercury = document.createElement("a-sphere")
    // mercury.setAttribute("radius", donnees[0].diameter/1000)
    // mercury.setAttribute("position",`${SUN_RADIUS+ +donnees[0].distance_from_sun} 0 -10`)
    // console.log(SUN_RADIUS)
    // console.log(`${SUN_RADIUS+ +donnees[0].distance_from_sun} 0 -10`)
    // scene.appendChild(mercury)
})