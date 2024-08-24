import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { title } from 'process';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'string;',
    title: 'string;',
    content: 'string;',
    likeCount: 3,
    commentCount: 3,
  },
  {
    id: 2,
    author: '2;',
    title: 'string;',
    content: 'string;',
    likeCount: 3,
    commentCount: 3,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param() id: number): PostModel {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  @Patch(':id')
  patchPosts(
    @Param('id') id: number,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.author = title;
    }

    if (content) {
      post.author = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === id ? post : prevPost));

    return post;
  }

  @Delete(':id')
  deletePosts(@Param('id') id: number) {
    posts = posts.filter((post) => post.id !== id);

    return id;
  }
}
