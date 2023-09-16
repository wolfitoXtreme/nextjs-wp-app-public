<?
  $price = get_field('price', $post_id);
  $bedrooms = get_field('bedrooms', $post_id);
  $bathrooms = get_field('bathrooms', $post_id);
  $hasParking = get_field('has_parking', $post_id);
  $petFriendly = get_field('pet_friendly', $post_id);
?>

<div>
  <div style="max-width: 500px; margin: 10px auto; color: black; background-color: rgba(255, 255, 255, .7); padding: 10px;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
      <div><i class="fa-solid fa-bed"></i><? echo $bedrooms; ?> bedrooms</div>
      <div><i class="fa-solid fa-bath"></i> <? echo $bathrooms; ?> bathrooms</div>
      <div><? if($hasParking) {echo "<i class='fa-solid fa-car'></i>Parking available"; } ?></div>
      <div><? if($petFriendly) {echo "<i class='fa-solid fa-dog'></i>Pet friendly"; } ?></div>
    </div>
  </div>
  <div style="text-align: center; font-size: 24px;"><b>&euro;<? echo $price; ?></b></div>
</div>
