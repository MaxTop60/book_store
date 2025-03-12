const sqrollToHeader = () => {
    const header = document.querySelector('.header');
    header.scrollIntoView({behavior: 'smooth'});
    return false;
}

export default sqrollToHeader;