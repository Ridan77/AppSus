import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'



const MAIL_KEY = 'mailDB'
console.log('Hi')
_createMails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}


const filterBy = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search 
    isRead: true,   // (optional property, if missing: show all) 
    isStared: true, // (optional property, if missing: show all) 
    lables: ['important', 'romantic'] // has any of the labels 
}



function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.Body) {
                mails = mails.filter(mail => mail.body >= filterBy.Body)
            }
            // console.log(' mails:', mails)
            return mails
        })
}



function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {

    const mail = {
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
    return mail
}

function getDefaultFilter() {
    return { txt: '', Body: '' }
}



function _createMails() {
    console.log('before')
    let mails = utilService.loadFromStorage(MAIL_KEY) || []
    console.log('agter')
    if (!mails || !mails.length) {
        mails = _mockData()
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail() {
    const mail = getEmptyMail()
    mail.id = utilService.utilService.makeId()
    return mail
}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const Body = searchParams.get('Body') || ''
    return {
        txt,
        Body
    }
}



function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}





function _mockData() {
    return  [
        {
            id: utilService.makeId(),
            createdAt: 1651133930500,
            subject: 'Meeting rescheduled',
            body: 'The meeting has been moved to Tuesday at 10 AM. Please confirm your availability.',
            isRead: false,
            sentAt: 1651133930594,
            removedAt: null,
            from: 'hr@company.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651145930500,
            subject: 'Your order has been shipped!',
            body: 'Your order #842913 has been shipped and is on its way. Track it here.',
            isRead: true,
            sentAt: 1651145930594,
            removedAt: null,
            from: 'no-reply@shopnow.com',
            to: 'jane.doe@gmail.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651157930500,
            subject: 'Reminder: Dentist appointment tomorrow',
            body: 'Just a reminder that you have a dental appointment scheduled for tomorrow at 3 PM.',
            isRead: false,
            sentAt: 1651157930594,
            removedAt: null,
            from: 'reception@smileclinic.org',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651169930500,
            subject: 'Weekend BBQ!',
            body: 'Were having a BBQ this weekend at our place. Bring drinks!',
            isRead: true,
            sentAt: 1651169930594,
            removedAt: null,
            from: 'jane.doe@gmail.com',
            to: 'david@friendsmail.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651181930500,
            subject: 'Security Alert',
            body: 'We noticed a login attempt from a new device. Was this you?',
            isRead: false,
            sentAt: 1651181930594,
            removedAt: null,
            from: 'alerts@securemail.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651193930500,
            subject: 'Invitation: Monthly Townhall',
            body: 'Join us for the monthly townhall meeting this Friday. Details inside.',
            isRead: true,
            sentAt: 1651193930594,
            removedAt: null,
            from: 'events@company.com',
            to: 'admin@corpnet.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651205930500,
            subject: 'Re: Project update',
            body: "Thanks for the update. Well review and follow up with any questions.",
            isRead: true,
            sentAt: 1651205930594,
            removedAt: null,
            from: 'manager@teamhub.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651217930500,
            subject: 'Flight itinerary',
            body: 'Your flight to New York is confirmed. Find your itinerary attached.',
            isRead: false,
            sentAt: 1651217930594,
            removedAt: null,
            from: 'booking@flyaway.com',
            to: 'you@example.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651229930500,
            subject: 'Sale ends today!',
            body: 'Dont miss out! Final hours of our big sale. Up to 70% off.',
            isRead: true,
            sentAt: 1651229930594,
            removedAt: null,
            from: 'deals@bestbuy.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651241930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometime soon. Coffee next week?',
            isRead: false,
            sentAt: 1651241930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'friend@mailme.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651253930500,
            subject: 'Subscription Renewal Notice',
            body: 'Your subscription will renew automatically on August 5th. Click here to manage settings.',
            isRead: true,
            sentAt: 1651253930594,
            removedAt: null,
            from: 'billing@streamplus.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651265930500,
            subject: 'Lunch tomorrow?',
            body: 'Hey! Want to grab lunch tomorrow at the new sushi place?',
            isRead: false,
            sentAt: 1651265930594,
            removedAt: null,
            from: 'tommy@gmail.com',
            to: 'danny@buddies.org'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651277930500,
            subject: 'Account Password Changed',
            body: 'Your password was successfully changed. If this wasnt you, please contact support.',
            isRead: true,
            sentAt: 1651277930594,
            removedAt: null,
            from: 'support@webapp.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651289930500,
            subject: 'Invoice for July',
            body: 'Please find attached the invoice for your July services.',
            isRead: true,
            sentAt: 1651289930594,
            removedAt: null,
            from: 'finance@agency.com',
            to: 'billing@freelancehost.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651301930500,
            subject: 'Feedback requested',
            body: 'Wed love your feedback on your recent visit. Take a short survey.',
            isRead: false,
            sentAt: 1651301930594,
            removedAt: null,
            from: 'noreply@reviewcenter.com',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651313930500,
            subject: 'Dog sitting next weekend?',
            body: 'Can you watch Max next weekend while Im out of town?',
            isRead: true,
            sentAt: 1651313930594,
            removedAt: null,
            from: 'sara.brown@yahoo.com',
            to: 'mike@neighbormail.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651325930500,
            subject: 'Zoom link for Fridays call',
            body: 'Here is the Zoom link for our 2 PM call on Friday. See you there.',
            isRead: false,
            sentAt: 1651325930594,
            removedAt: null,
            from: 'colleague@remotehub.io',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651337930500,
            subject: 'Event Photos',
            body: 'Check out the photos from last weekends event!',
            isRead: true,
            sentAt: 1651337930594,
            removedAt: null,
            from: 'photos@pixit.com',
            to: 'gallery@picsync.net'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651349930500,
            subject: 'Can you send the slides?',
            body: 'Hey, can you send me the slides from todays presentation?',
            isRead: false,
            sentAt: 1651349930594,
            removedAt: null,
            from: 'rachel@designco.net',
            to: 'user@appsus.com'
        },
        {
            id: utilService.makeId(),
            createdAt: 1651361930500,
            subject: 'Happy Birthday!',
            body: 'Wishing you a fantastic birthday and a wonderful year ahead!',
            isRead: true,
            sentAt: 1651361930594,
            removedAt: null,
            from: 'friends@partygroup.com',
            to: 'wishes@inbox.me'
        }
    ]



}