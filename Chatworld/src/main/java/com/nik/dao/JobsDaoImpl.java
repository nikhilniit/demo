package com.nik.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nik.model.Jobs;
import com.nik.model.Jobs;
@Transactional
@Repository
public class JobsDaoImpl implements JobsDao{
@Autowired
SessionFactory sessionFactory;
	public void addJobs(Jobs jobs) {
		
		sessionFactory.getCurrentSession().save(jobs);
	}
	public List<Jobs> viewJobs() {
		List<Jobs> list = sessionFactory.getCurrentSession().createCriteria(Jobs.class).list();
			return list;
		}
		
		public void deleteJob(Jobs jobs) {
		sessionFactory.getCurrentSession().delete(jobs);
			
			
		}
		
		public void updateJob(Jobs jobs) {
			
			sessionFactory.getCurrentSession().update(jobs);
		}
		
		
}
