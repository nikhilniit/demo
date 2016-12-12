package com.nik.dao;

import java.util.List;

import com.nik.model.Blog;
import com.nik.model.Jobs;

public interface JobsDao {
void addJobs(Jobs jobs);
List<Jobs> viewJobs();

void deleteJob(Jobs jobs);
void updateJob(Jobs jobs);

}
