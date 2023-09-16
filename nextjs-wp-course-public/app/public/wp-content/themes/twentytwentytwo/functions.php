<?php
/**
 * Twenty Twenty-Two functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Two
 * @since Twenty Twenty-Two 1.0
 */

if (function_exists( 'acf_add_options_page' ) ) :
	// https://developer.wordpress.org/resource/dashicons/
	acf_add_options_page(array(
		'page_title' 			=> 'Main menu',
		'menu_title' 			=> 'Main menu',
		'show_in_graphql' => true,
		'icon_url'				=> 'dashicons-menu'
	));
endif;

if ( ! function_exists( 'twentytwentytwo_support' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_support() {

		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );

	}

endif;

add_action( 'after_setup_theme', 'twentytwentytwo_support' );

if ( ! function_exists( 'twentytwentytwo_styles' ) ) :

	/**
	 * Enqueue styles.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_styles() {
		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );

		$version_string = is_string( $theme_version ) ? $theme_version : false;
		wp_register_style(
			'twentytwentytwo-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'twentytwentytwo-style' );

	}

endif;

add_action( 'wp_enqueue_scripts', 'twentytwentytwo_styles' );

/**
* Registers an editor stylesheet for the theme.
*/
function wpdocs_theme_add_editor_styles() {
	add_editor_style( 'custom-editor-style.css' );
}
add_action( 'admin_init', 'wpdocs_theme_add_editor_styles' );

// Add block patterns
require get_template_directory() . '/inc/block-patterns.php';

// registering custom blocks
	// Do I really need custom blocks ?
	// Seems the main utility is of rendering in WP UI
add_action('acf/init', 'acf_init_block_types');
function acf_init_block_types() {

	// add attributes to custom blocks
	add_filter('wp_graphql_blocks_process_attributes', function($attributes, $data, $post_id){
		if($data['blockName'] == 'acf/propertyfeatures') {
			$attributes['price'] = get_field('price', $post_id) ?? "";
			$attributes['bedrooms'] = get_field('bedrooms', $post_id) ?? "";
			$attributes['bathrooms'] = get_field('bathrooms', $post_id) ?? "";
			$attributes['hasParking'] = get_field('has_parking', $post_id) ?? "";
			$attributes['petFriendly'] = get_field('pet_friendly', $post_id) ?? "";
		};

		return $attributes;
	},0, 3); // 0 is high priority, number of attributes ($attributes, $data, $post_id)

	// add fonts awesome icons
	wp_enqueue_script('fontAwesome', get_template_directory_uri() . "/template-parts/fontsAwesome/all.min.js");

	// register_block_type built in function
	// replaces legacy function 'acf_register_block_type(array(...))'
	if (function_exists( 'register_block_type' ) ) :
		register_block_type(get_template_directory() . "/template-parts/blocks/ctaButton/block.json");
		register_block_type(get_template_directory() . "/template-parts/blocks/propertySearch/block.json");
		register_block_type(get_template_directory() . "/template-parts/blocks/formSpreeForm/block.json");
		register_block_type(get_template_directory() . "/template-parts/blocks/propertyFeatures/block.json");
		register_block_type(get_template_directory() . "/template-parts/blocks/tickItem/block.json");
	endif;
}
