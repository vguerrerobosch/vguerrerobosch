---
title: "Solving N+1 problems in WordPress loop when displaying post excerpt"
date: 2020-04-06T14:21:41+02:00
draft: false
thumbnail: /images/wordpress-query-optimization.png
---

It's a fairly common scenario in WordPress sites to have a loop of posts where we display the post title and the excerpt. Many times, users don't provide an excerpt when they submit new content, so the excerpt is generated form the content itself.

WordPress 4.4.0 introduced `wp_make_content_images_responsive` function that filters all `img` elements in the post content to add `srcset` and `sizes` attributes. This function is hooked to the `the_content` filter.

So now, when we get the excerpt, if the `post_excerpt` is empty and the post content contains images from the media library, WordPress will run 2 database queries for each post like:

```sql
SELECT wp_posts.* FROM wp_posts WHERE ID IN (290,291,292,293)
SELECT post_id, meta_key, meta_value FROM wp_postmeta WHERE post_id IN (290,291,292,293) ORDER BY meta_id ASC
```

where the IDs correspond to the media images in the post content. This ultimately leads to a N+1 problem which will impact site performance negatively. For a default blog index page with 10 posts, this represents up to 20 additional queries on top of 10 that already existed. Furthermore, making the images responsive in the post excerpt is useless as they aren't displayed at all.

This problem can be solved with the following code snippet:

```php
<?php
add_filter('get_the_excerpt', function ($excerpt, $post) {
    remove_filter('the_content', 'wp_make_content_images_responsive');
    return $excerpt;
}, 1, 2);

add_filter('get_the_excerpt', function ($excerpt, $post) {
    add_filter('the_content', 'wp_make_content_images_responsive');
    return $excerpt;
}, 100, 2);
```

What we are doing here is, when we attempt to get the excerpt, we remove the filter to make the responsive images and when we are done we add it back.

This may seem not such a big deal, but when you are dealing with thousands of page requests, these kind of optimization will reduce the response time and ultimately your server costs.
