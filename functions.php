<?php 

/** Disable google-recaptcha scripts **/
add_action('wp_print_scripts', function () 
{
  wp_dequeue_script('google-recaptcha');
  wp_dequeue_script('wpcf7-recaptcha');
});

