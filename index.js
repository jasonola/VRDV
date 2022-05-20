SUN_RADIUS_KM = 1392000/2/1000000
PLANET_COLORS = ["grey","#712d2d","#2525b6","#602424","#93622a","#b1911b","#91f8f8","#2a2aa7","grey"]
PLANET_TEXTURES = ["mercury.jpeg","venus.jpeg", "earth.webp","mars.jpeg","jupiter.jpeg", "saturn.jpeg", "uranus.jpeg", "neptune.jpeg", "pluto.jpeg"]
d3.csv("planets.csv",function(d){
    return {
        radius_km : +d.diameter/2/1000000,
        sun_dist_km : +d.distance_from_sun*10e6/1000000,
        planet : d.planet,
        orbital_period_days : +d.orbital_period
    }
}).then(donnees => {
    // console.log(donnees)
    // for(let i = 0; i<donnees.length; i++){
    //     console.log(donnees[i].planet, donnees[i].radius_km,+donnees[i].sun_dist_km)
    // }
    let scene = document.querySelector("a-scene")
    let sun = document.createElement("a-sphere")
    let camera = document.createElement("a-camera")
    
    sun.setAttribute("radius",SUN_RADIUS_KM*10)
    sun.setAttribute("position","0 0 0")
    //sun.setAttribute("color", "#fa5700")
    sun.setAttribute("id", "Sun")
    sun.setAttribute("src","sun.jpeg")
    sun.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 100000; easing: linear")
    scene.appendChild(sun)

    console.log(sun)

    camera.setAttribute("position", "0 0 50")
    camera.setAttribute("active","true")
    
    scene.appendChild(camera)

    
    for (let i = 0; i < donnees.length; i++) {
        let planet = document.createElement("a-sphere")
        let center = document.createElement("a-entity")
        center.setAttribute("position", "0 0 0")
        center.setAttribute("animation", `property: rotation; to: 0 360 0; loop: true; dur: ${donnees[i].orbital_period_days*10} ; easing: linear`)
        planet.setAttribute("radius", +donnees[i].radius_km*50)
        planet.setAttribute("position",`${SUN_RADIUS_KM+ +donnees[i].sun_dist_km/1000} 0 -10`)
        planet.setAttribute("id", donnees[i].planet)
        planet.setAttribute("src", PLANET_TEXTURES[i])
        //planet.setAttribute("animation", `attribute: rotation; to: 0 360 0; repeat: indefinite; dur: ${donnees[i].orbital_period_days/}; easing:linear`)
        scene.appendChild(center)
        center.appendChild(planet)
        console.log(planet)
    }
    // let mercury = document.createElement("a-box")
    // mercury.setAttribute("radius", donnees[0].radius_km*100)
    // mercury.setAttribute("position",`${SUN_RADIUS_KM+ donnees[0].sun_dist_km/100} 0 0`)
    // mercury.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 5000; easing:linear")
    // console.log(mercury)
    // sun.appendChild(mercury)
})