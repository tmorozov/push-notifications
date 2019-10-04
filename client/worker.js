console.log('worker registered');

self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('push recieved');
    self.registration.showNotification(data.title, {
        body: 'Notified',
        icon: 'https://icon-library.net/images/cat-icon-png/cat-icon-png-8.jpg'
    })
});