package com.nik.dao;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nik.model.Blog;
@Transactional
@Repository
public class BlogDaoImpl implements BlogDao{
@Autowired
SessionFactory sessionFactory;
	public void addBlog(Blog blog) {
		
		sessionFactory.getCurrentSession().save(blog);
	}
	public List<Blog> viewBlogs() {
	List<Blog> list = sessionFactory.getCurrentSession().createCriteria(Blog.class).list();
		return list;
	}
	
	public void deleteBlog(Blog blog) {
	sessionFactory.getCurrentSession().delete(blog);
	}
	public void updateBlog(Blog blog) {
		
		sessionFactory.getCurrentSession().update(blog);
	}
	
	public List<Blog> viewMyBlogs(String postedby) {
		System.out.println("in view my blogs");
		Session session=sessionFactory.getCurrentSession();
		Criteria ct=session.createCriteria(Blog.class);
		ct.add(Restrictions.eq("postedby",postedby));
		ct.add(Restrictions.eq("status",true));
		List list=ct.list();	
		return list;
		}	

	/*public void updateBlogs(int id)
	{
		sessionFactory.getCurrentSession().update(blog);
	}*/
}
