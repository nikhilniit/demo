package com.nik.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nik.dao.BlogDao;
import com.nik.model.Blog;
import com.nik.model.Users;

@RestController
public class BlogController {
@Autowired
BlogDao blogDao;
@RequestMapping(value="/addBlog",headers="accept=Application/json",method=RequestMethod.POST)
public void addBlog(@RequestBody Blog blog)
{
	blogDao.addBlog(blog);
}
@RequestMapping(value="/viewBlogs",headers="accept=Application/json",method=RequestMethod.GET)
public List<Blog> viewBlogs()
{
	return blogDao.viewBlogs();
	
}

@RequestMapping(value="/deleteBlog",headers="accept=Application/json",method=RequestMethod.POST)
public void deleteBlog(@RequestBody Blog blog)
{
	blogDao.deleteBlog(blog);
}
@RequestMapping(value="/updateBlog",headers="accept=Application/json",method=RequestMethod.PUT)
public void updateBlog(@RequestBody Blog blog)
{
	blogDao.updateBlog(blog);
}

@RequestMapping(value="/viewMyBlogs/{postedby}",headers="accept=Application/json",method=RequestMethod.GET)
public List<Blog> viewMyBlogs(@PathVariable("postedby") String postedby)
{
	return blogDao.viewMyBlogs(postedby);
	
}
/*public void updateBlogs(@PathVariable int id)
{
	blogDao.updateBlogs(id);
}*/
}
