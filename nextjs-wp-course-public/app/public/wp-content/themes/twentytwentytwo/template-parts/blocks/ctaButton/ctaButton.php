<?
  // echo "CTA button placeholder"
  $blockName = "cta-button";
  $label = get_field('label');
  $align = get_field('alignment');
  // echo $label;
?>

<div class="<? echo $blockName . '-' . $align ?>">
  <div class="<? echo $blockName; ?>">
    <? echo $label; ?>
  </div>
</div>

<style>
  .<? echo $blockName; ?> {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    display: inline-block;
    background-color: #ec489a;
  }

  .<? echo $blockName . '-' . 'left' ?> {
    text-align: left;
  }

  .<? echo $blockName . '-' . 'center' ?> {
    text-align: center;
  }

  .<? echo $blockName . '-' . 'right' ?> {
    text-align: right;
  }
</style>
