﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication4.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected BookStoreDbContext dbContext;
        protected DbSet<TEntity> dbSet;

        public Repository(BookStoreDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.dbSet = dbContext.Set<TEntity>();
        }
        public void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }
        public void Update(TEntity entity)
        {
            dbSet.Attach(entity);
            dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void Delete(TEntity entity)
        {
            if (dbContext.Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dbSet.Remove(entity);
        }
    }
}
