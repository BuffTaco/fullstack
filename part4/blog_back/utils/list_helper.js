const lodash = require('lodash/collection')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = 0;
    
    blogs.forEach((blog) => {
        total += blog.likes;
    })

    return total;
}

const favoriteBlog = (blogs) => {
    let max = 0;

    let fav;

    for (i in blogs)
    {
        if (blogs[i].likes >= max)
        {
            max = blogs[i].likes;
            fav = blogs[i];
        }
    }
    return blogs.length === 0
    ? null
    : fav;
}

const mostBlogs = (blogs) => {
    
    const counted = lodash.countBy(blogs, (blog) => {
        return blog.author
    })
    
    var max = 0;
    var currMax = null;
    lodash.forEach(counted, (value, key) => {
        
        if (value >= max)
        {
            max = value;
            currMax = key;
        }
        

        
    })
    const obj = {
        author: currMax,
        blogs: max
    }
    
    return blogs.length === 0 
    ? null
    : obj;
}

const mostLikes = (blogs) => {
    const grouped = lodash.groupBy(blogs, (blog) => {
        return blog.author;
    })
    
    var max = 0;
    var currWin = null;
    lodash.forEach(grouped, (value, key, object) => {
        
        let temp = lodash.reduce(value, (result, value) => {
            
            return result + value.likes;
        }, 0)
        if (temp >= max)
        {
            max = temp;
            currWin = key;
        }

    })

    const obj = {
        author: currWin,
        likes: max
    }
    return blogs.length === 0
    ? null
    : obj;


    


}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes

}