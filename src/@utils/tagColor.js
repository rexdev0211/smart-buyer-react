const colorsPalette = [
      "#FF75D6", 
      "#3087A8", 
      "#07A637",
      "#FF3D00",
      "#3F52B5",
      "#A589DA",
      "#A6267F",
      "#FA71A1",
      "#F50057",
      "#51A100",
      "#FFC841",
      "#9F0038",
      "#1DCDFF",
      "#6E29A6",
      "#142476",
      "#CE03E3"
    ];

function getColorIndex(str, size=16) {
    return str.split('').map(ch => ch.charCodeAt(0)).reduce((pr, cv, ar) => {
      pr += cv;
      return pr;
    }, 0) % size;
  };


export function tagColor(tagName) {
    return colorsPalette[getColorIndex(tagName)]
}

