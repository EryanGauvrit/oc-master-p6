CREATE TABLE `subscriptions` (
  `subscribing_user_id` integer,
  `subscribed_topic_id` integer
);

CREATE TABLE `topics` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `user_id` integer NOT NULL,
  `post_id` integer NOT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` integer NOT NULL,
  `topic_id` integer NOT NULL,
  `updated_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now())
);

ALTER TABLE `posts` ADD CONSTRAINT `user_posts` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD CONSTRAINT `topic_posts` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`);

ALTER TABLE `comments` ADD CONSTRAINT `user_comments` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD CONSTRAINT `post_comments` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `subscriptions` ADD FOREIGN KEY (`subscribing_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `subscriptions` ADD FOREIGN KEY (`subscribed_topic_id`) REFERENCES `topics` (`id`);
