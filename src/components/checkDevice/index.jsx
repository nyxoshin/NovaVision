const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    const iOSDevice = navigator.userAgent.match(/iPhone|iPad/i);
    const iPadOS13Up =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return iOSDevice || iPadOS13Up;
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/Windows/i);
  },
  Mac: function () {
    return navigator.userAgent.match(/Macintosh/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Mac() ||
      isMobile.Windows()
    );
  },
};

export default isMobile;
