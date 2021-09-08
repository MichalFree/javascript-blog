{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),

  }

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.author-name';


  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.post.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    const clickedArticle = document.querySelector(articleSelector);
    clickedArticle.classList.add('active');
  };

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const tagLinkHTMLData = {id: tag, title: tag};
      const tagLinkHTML = templates.tagLink(tagLinkHTMLData);
      html += tagLinkHTML;
      if (!allTags[tag]) {
        allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        titleList.innerHTML = titleList.innerHTML + ' ' + tagLinkHTML;
      }
      const tagList = document.querySelector(optTagListSelector);
      const allTagsData = {tags: []};
      const tagsParams = calculateTagsParams(allTags);
      for (let tag in allTags) {
        const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' ' + '</a></li>'
        allTagsData.tags.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      }
      tagList.innerHTML = templates.tagCloudLink(allTagsData);
    }
  }
  const tagClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    for (let tagLink of tagLinks) {
      tagLink.classList.remove('active');
    }
    const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    for (let tagLinkHref of tagLinksHref) {
      tagLinkHref.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

function addClickListenersToTags() {
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  for (let link of allLinksToTags) {
    link.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {
  let allAuthors = {}
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const titleList = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const authorTags = article.getAttribute('data-author');
    const authorLinkHTMLData = {id: authorTags, title: authorTags};
    const authorLinkHTML = templates.authorLink(authorLinkHTMLData);
    html += authorLinkHTML;
    if (!allAuthors[authorTags]) {
      allAuthors[authorTags] = 1;
      } else {
        allAuthors[authorTags]++;
      }
      titleList.innerHTML = titleList.innerHTML + authorLinkHTML;
      const authorList = document.querySelector(optAuthorsListSelector);
      const allAuthorsData = {authors: []};
      for (let author in allAuthors) {
        allAuthorsData.authors.push({
          author: author,
          count: allAuthors[author],
        });
      }
      authorList.innerHTML = templates.authorCloudLink(allAuthorsData)
    }
  }

const authorClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#author-', '');
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLinkHref of authorLinksHref) {
    authorLinkHref.classList.add('active');
  }
  generateTitleLinks('[data-author="' + tag + '"]');
}

  function addClickListenersToAuthors() {
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
    for (let link of allLinksToAuthors) {
      link.addEventListener('click', authorClickHandler);
    }
  }

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();

}
