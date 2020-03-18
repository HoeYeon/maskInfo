export const CreateInfo = (
  map,
  latitude,
  longitude,
  { name, stock_at, remain_stat }
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
      <div style="padding:5px; font-size:10px"><strong>${name}</strong>&nbsp
      <span style = "color:${color}">
      ${
        remain_stat === "plenty"
          ? "100+"
          : remain_stat === "some"
          ? "30~100"
          : remain_stat === "few"
          ? "2~30"
          : remain_stat === "empty"
          ? "재고없음"
          : "판매중지"
      }</span><br>
      입고예정: ${stock_at.slice(5, stock_at.length)}
      </div>
      `;
  const iwRemoveable = false,
    iwPosition = new window.daum.maps.LatLng(latitude, longitude);

  // create info Window
  const infowindow = new window.daum.maps.InfoWindow({
    position: iwPosition,
    content: content,
    removable: iwRemoveable
  });
  infowindow.open(map);
};
