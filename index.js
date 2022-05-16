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
    scene.appendChild(sun)
    let mercury = document.createElement("a-sphere")
    mercury.setAttribute("radius", donnees[0].diameter/1000)
    mercury.setAttribute("position",`${SUN_RADIUS+donnees[0]} 0 -10`)
    console.log(mercury)
    scene.appendChild(mercury)
})