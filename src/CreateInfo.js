export const CreateInfo = (
  map,
  latitude,
  longitude,
  { name, remain_stat, isStock }
) => {
  const color =
    remain_stat === "plenty"
      ? "#2ecc71"
      : remain_stat === "some"
      ? "#f1c40f"
      : remain_stat === "few"
      ? "#c0392b"
      : remain_stat === "empty"
      ? "#95a5a6"
      : "#2c3e50";

  const content = `
      <div style="padding:5px; font-size:10px; background-color:#ffffff"><strong>${name}</strong>&nbsp
      <span style = "color:${color}"><br>
      ${
        remain_stat === "plenty"
          ? "100+"
          : remain_stat === "some"
          ? "30~100"
          : remain_stat === "few"
          ? "2~30"
          : "재고없음"
      }</span>
      </div>
      `;
  const iwRemoveable = false,
    iwPosition = new window.daum.maps.LatLng(latitude, longitude);

  // create info Window
  return new window.kakao.maps.CustomOverlay({
    position: iwPosition,
    content: content,
    removable: iwRemoveable
  });
  //   console.log(isStock);
  //   isStock ? custom.setMap(null) : custom.setMap(map);

  //infowindow.open(map);
};
