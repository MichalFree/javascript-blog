'use strict';

const titleClickHandler = function(event){
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  const clickedArticle = document.querySelector(articleSelector);
  clickedArticle.classList.add('active');
}
const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html += tagLinkHTML;

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = titleList.innerHTML + ' ' + tagLinkHTML;
    }

    /* END LOOP: for every article: */
  }
}
const tagClickHandler = function (event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref) {

    /* add class active */
    tagLinkHref.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
function addClickListenersToTags() {

  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  }

  /* END LOOP: for each link */
}

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const titleList = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const authorTags = article.getAttribute('data-author');
    const authorLinkHTML = '<span>by </span><a href="#-author' + authorTags + '"><span>' + authorTags + '</span></a>';
    html += authorLinkHTML;
    titleList.innerHTML = titleList.innerHTML + authorLinkHTML;
  }
}
const authorClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#-author', '');
  const authorLinks = document.querySelectorAll('a.active[href^="#-author"]');
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
  const allLinksToAuthors = document.querySelectorAll('a[href^="#-author"]');
  for (let link of allLinksToAuthors) {
    link.addEventListener('click', authorClickHandler);
  }
}

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
