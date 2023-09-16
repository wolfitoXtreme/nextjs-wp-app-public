<?
  // will be set in WP UI from https://formspree.io/forms/
  // form project 'WordPress Integration Form'
  $formId = get_field('form_id');
  $formUrl = 'https://formspree.io/forms/';
?>

<div>
  <h4>FormSpree Form</h4>
  <div>Check your form submission <a href="<? echo $formUrl.$formId ?>/submissions/" target="_blank">here</a></div>
</div>
