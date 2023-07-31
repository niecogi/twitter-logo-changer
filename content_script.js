function getElementByTagH1() {
  return new Promise((resolve) => {

    setTimeout(() => {
      const h1 = document.getElementsByTagName("h1");
      resolve(h1);
    }, 2000);
  });
}

async function main() {
  try {
    // We wait until the variable has information
    // This "wait" is necessary, otherwise it will return undefined.
    const data = await getElementByTagH1();

    const extensionId = chrome.runtime.id;
    const linkElement =  document.querySelector('[rel="shortcut icon"]')

    linkElement.href = `chrome-extension://${extensionId}/icon.png`

    const svgElement = await searchSVGElement(data[0]);

    const title =  document.getElementsByTagName("title");

    title[0].innerHTML = "Home / Twitter"

    // Check if the SVG element is found
    if (svgElement) {
      // Replace the SVG content with your custom logo X (copy the entire SVG code)
      // For example:
      const customLogoX = `
        <!-- Your custom SVG code for the logo X -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48 "width="48px" height="48px"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg>

        </svg>
      `;

      const svgParentElement = svgElement.parentElement;
      svgParentElement.innerHTML = customLogoX;
    }
  } catch (error) {
    console.error("Error al obtener la información:", error);
  }
}

//Recursive function to search the SVGElement
async function searchSVGElement(elemento) {
  console.log(elemento);
  if (elemento.tagName === "svg") {
    return elemento; // If it is an <svg>, we have found it, we return the element
  }

  // Si no es <svg>, buscamos en sus hijos
  const hijos = elemento.children;
  for (let i = 0; i < hijos.length; i++) {
    const hijoEncontrado = await searchSVGElement(hijos[i]);
    if (hijoEncontrado !== null) {
      return hijoEncontrado; // If we find the <svg> in the children, we return it
    }
  }

  // If the <svg> was not found in this element or in its children, we return null
  return null;
}

function getElementH1() {
  return new Promise((resolve) => {
  setTimeout(() => {
      const h1 = document.getElementsByTagName("h1");
      resolve(h1);

  }, 2000);
  })
}

main();