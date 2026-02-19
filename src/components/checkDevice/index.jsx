function getNavigatorInfo() {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  return { ua, platform };
}

const isMobile = {
  Android: function () {
    const { ua } = getNavigatorInfo();
    return /Android/i.test(ua);
  },
  BlackBerry: function () {
    const { ua } = getNavigatorInfo();
    return /BlackBerry/i.test(ua);
  },
  iOS: function () {
    const { ua, platform } = getNavigatorInfo();
    const iOSDevice = /iPhone|iPad/i.test(ua);
    const iPadOS13Up =
      platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return iOSDevice || iPadOS13Up;
  },
  Opera: function () {
    const { ua } = getNavigatorInfo();
    return /Opera Mini/i.test(ua);
  },
  Windows: function () {
    const { ua } = getNavigatorInfo();
    return /Windows/i.test(ua);
  },
  Mac: function () {
    const { ua } = getNavigatorInfo();
    return /Macintosh/i.test(ua);
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
