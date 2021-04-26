
//热门关键词
Mock.mock('/hotwords',{
    'result|8-15':[{
        word:'@cword(2,5)',
        href:'@url(http)'
    }
    ]
})

Mock.mock('/randomWord',{
    word:'@cword(2,5)',
    href:'@url(http)'
})