package com.nik.dao;

import java.util.List;

import com.nik.model.Blog;

public interface BlogDao {
void addBlog(Blog blog);

List<Blog> viewBlogs();

void deleteBlog(Blog blog);
void updateBlog(Blog blog);
/*void updateBlogs(Blog blog);*/
List<Blog> viewMyBlogs(String postedby);
}
