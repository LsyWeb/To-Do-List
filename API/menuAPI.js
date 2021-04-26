Mock.mock('/menu', {
    'data|18': [{
        'titles|2-4': [{
            name: '@cword(2,3)',
            href: '@url(http)'
        }],
        content: {
            'tabs|3-6': [{
                name: '@cword(2,5)',
                href: '@url(http)'
            }],
            'details|10-15': [{
                category: '@cword(2,4)',
                'items|8-16': [{
                    href: '@url(http)',
                    name: '@cword(2,4)'
                }]
            }]
        }
    }]
});