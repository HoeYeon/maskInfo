export const CreateInfo = (
  map,
  latitude,
  longitude,
  { name, stock_at, remain_stat }
) => {
  const content = `
      <div style="padding:5px; font-size:12px"><strong>${name}</strong><br>  ${stock_at}<br>${remain_stat}</a></div>
      `;
  const iwRemoveable = true,
    iwPosition = new window.daum.maps.LatLng(latitude, longitude);

  // create info Window
  const infowindow = new window.daum.maps.InfoWindow({
    position: iwPosition,
    content: content,
    removable: iwRemoveable
  });
  infowindow.open(map);
};
