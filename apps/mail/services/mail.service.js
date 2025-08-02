import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'



const MAIL_KEY = 'mailDB'
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
    getFilterFromSearchParams,
    toggleReadState,
    moveToTrash,
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
            if (filterBy.folder) {
                switch (filterBy.folder) {

                    case 'inbox':
                        mails = mails.filter(mail => mail.to === loggedinUser.email)
                            .filter(mail => !mail.removedAt)
                            .filter(mail => mail.sentAt)
                        break
                    case 'starred':
                        mails = mails.filter(mail => mail.isStared)

                        break
                    case 'sent':
                        mails = mails.filter(mail => mail.to !== loggedinUser.email)
                            .filter(mail => mail.sentAt)
                        break
                    case 'draft':
                        mails = mails.filter(mail => !mail.sentAt)
                        break
                    case 'trash':
                        mails = mails.filter(mail => mail.removedAt)

                        break

                }

            }
            return mails
        })
}



function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
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
        to: '',
        isStared: false
    }
    return mail
}

function getDefaultFilter() {
    return { txt: '', Body: '' }
}



function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY) || []
    if (!mails || !mails.length) {
        mails = _mockData()
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const folder = searchParams.get('folder') || ''
    const createdAt = searchParams.get('createdAt') || ''
    const subject= searchParams.get('subject') || ''
    return {
        txt,
        folder,
        createdAt,
        subject
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

function toggleReadState(mailId) {
    return get(mailId)
        .then(mail => {
            mail.isRead = !mail.isRead
            save(mail)
            return mail
        })

}

function moveToTrash(mail) {
    mail.removedAt = Date.now()
    return save(mail)

}



function _mockData() {
    return [
        {
            id: utilService.makeId(),
            createdAt: 1651133930500,
            subject: 'Meeting rescheduled',
            body: 'The meeting has been moved to Tuesday at 10 AM. Please confirm your availability.',
            isRead: false,
            sentAt: 1651133930594,
            removedAt: null,
            from: 'hr@company.com',
            to: 'user@appsus.com',
            isStared: false

        },
        {
            id: utilService.makeId(),
            createdAt: 1651145930500,
            subject: 'Your order has been shipped!',
            body: 'Your order #842913 has been shipped and is on its way. Track it here.',
            isRead: true,
            sentAt: 1651145930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'jane.doe@gmail.com',
            isStared: false

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
            to: 'user@appsus.com',
            isStared: false

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
            to: 'david@friendsmail.com',
            isStared: false

        },
        {
            id: utilService.makeId(),
            createdAt: 1651181930500,
            subject: 'Security Alert',
            body: 'We noticed a login attempt from a new device. Was this you?',
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'alerts@securemail.com',
            to: 'user@appsus.com',
            isStared: false,

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
            to: 'admin@corpnet.com',
            isStared: false

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
            to: 'user@appsus.com',
            isStared: false

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
            to: 'you@example.com',
            isStared: false

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
            to: 'user@appsus.com',
            isStared: false

        },
        {
            id: utilService.makeId(),
            createdAt: 1651241930500,
            subject: 'Miss you!',
            body: 'Would love to catch up sometime soon. Coffee next week?',
            isRead: false,
            sentAt: 1651241930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'friend@mailme.com',
            isStared: false

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
            to: 'user@appsus.com',
            isStared: false

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
            to: 'danny@buddies.org',
            isStared: false

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
            to: 'user@appsus.com',
            isStared: false

        },
        {
            id: utilService.makeId(),
            createdAt: 1651289930500,
            subject: 'Invoice for July',
            body: 'Please find attached the invoice for your July services.',
            isRead: true,
            sentAt: 1651289930594,
            removedAt: 1651289930594,
            from: 'finance@agency.com',
            to: 'billing@freelancehost.com',
            isStared: false

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
            to: 'user@appsus.com',
            isStared: false

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
            to: 'mike@neighbormail.com',
            isStared: true

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
            to: 'user@appsus.com',
            isStared: true

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
            to: 'gallery@picsync.net',
            isStared: true

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
            to: 'user@appsus.com',
            isStared: false

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
            to: 'wishes@inbox.me',
            isStared: false

        },
                {
            id: utilService.makeId(),
            createdAt: 1651373930500,
            subject: 'Welcome to AppSus!',
            body: 'Thanks for signing up! We’re glad to have you with us.',
            isRead: true,
            sentAt: 1651373930594,
            removedAt: null,
            from: 'no-reply@appsus.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651385930500,
            subject: 'Dinner plans?',
            body: 'How about Italian tonight at 7? Let me know.',
            isRead: false,
            sentAt: 1651385930594,
            removedAt: null,
            from: 'alex@friendsmail.com',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651397930500,
            subject: 'Password reset requested',
            body: 'Click the link below to reset your password.',
            isRead: true,
            sentAt: 1651397930594,
            removedAt: null,
            from: 'support@security.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651409930500,
            subject: 'Movie night',
            body: 'Want to watch a movie tonight? Popcorn’s on me.',
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'liz@buddymail.com',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651421930500,
            subject: 'Congrats on your promotion!',
            body: 'Just heard the news — congrats! Drinks soon?',
            isRead: true,
            sentAt: 1651421930594,
            removedAt: null,
            from: 'paul@company.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651433930500,
            subject: 'Book Club Reminder',
            body: 'Don’t forget our book club meeting Thursday evening.',
            isRead: false,
            sentAt: 1651433930594,
            removedAt: null,
            from: 'bookclub@readingnow.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651445930500,
            subject: 'Receipt for your payment',
            body: 'Thank you for your payment of $49.99. Invoice attached.',
            isRead: true,
            sentAt: 1651445930594,
            removedAt: null,
            from: 'payments@onlineshop.com',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651457930500,
            subject: 'Running late',
            body: 'Stuck in traffic — be there in 15!',
            isRead: false,
            sentAt: 1651457930594,
            removedAt: null,
            from: 'matt@fastmail.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651469930500,
            subject: 'Your resume was received',
            body: 'Thank you for applying. We’ll be in touch shortly.',
            isRead: true,
            sentAt: 1651469930594,
            removedAt: null,
            from: 'hr@careersite.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651481930500,
            subject: 'Group trip planning',
            body: 'We need to finalize flights and hotels by Friday.',
            isRead: false,
            sentAt: 1651481930594,
            removedAt: null,
            from: 'travelgroup@funtrips.com',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651493930500,
            subject: 'Important: Service Downtime',
            body: 'Our services will be temporarily unavailable Sunday morning.',
            isRead: true,
            sentAt: 1651493930594,
            removedAt: null,
            from: 'status@infranews.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651505930500,
            subject: 'Photo memories!',
            body: 'Loved those vacation shots. Sending more soon!',
            isRead: false,
            sentAt: 1651505930594,
            removedAt: null,
            from: 'emily@friends.net',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651517930500,
            subject: 'Interview confirmation',
            body: 'Your interview is confirmed for Wednesday at 11 AM.',
            isRead: true,
            sentAt: 1651517930594,
            removedAt: null,
            from: 'recruiter@jobs.io',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651529930500,
            subject: 'Check out this article',
            body: 'Thought you might enjoy this piece on productivity.',
            isRead: false,
            sentAt: 1651529930594,
            removedAt: null,
            from: 'blogger@readthis.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651541930500,
            subject: 'We’ve missed you!',
            body: 'Here’s 20% off your next order — come back soon.',
            isRead: true,
            sentAt: 1651541930594,
            removedAt: null,
            from: 'promo@shoponline.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651553930500,
            subject: 'RSVP: Birthday Bash 🎉',
            body: 'Let us know if you can join! Saturday at 6.',
            isRead: false,
            sentAt: 1651553930594,
            removedAt: null,
            from: 'party@funmail.com',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651565930500,
            subject: 'System Maintenance Notice',
            body: 'Maintenance is scheduled for midnight tonight.',
            isRead: true,
            sentAt: 1651565930594,
            removedAt: null,
            from: 'it@company.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651577930500,
            subject: 'Quick question',
            body: 'Are you free for a quick call tomorrow?',
            isRead: false,
            sentAt: 1651577930594,
            removedAt: null,
            from: 'josh@fastreply.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651589930500,
            subject: 'New device login',
            body: 'Your account was accessed from a new location.',
            isRead: true,
            sentAt: 1651589930594,
            removedAt: null,
            from: 'alert@securemail.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651601930500,
            subject: 'Coffee catch-up?',
            body: 'Free this week to catch up? Let’s grab coffee.',
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'nina@friends.co',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651613930500,
            subject: 'Spotify Receipt',
            body: 'Your monthly Spotify receipt is now available.',
            isRead: true,
            sentAt: 1651613930594,
            removedAt: null,
            from: 'billing@spotify.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651625930500,
            subject: 'Can you proofread this?',
            body: 'Mind taking a look at this draft before I send?',
            isRead: false,
            sentAt: 1651625930594,
            removedAt: null,
            from: 'coworker@teammail.com',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651637930500,
            subject: 'Ideas for the offsite',
            body: 'Got any ideas for our next offsite?',
            isRead: true,
            sentAt: 1651637930594,
            removedAt: null,
            from: 'teamlead@company.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651649930500,
            subject: 'LinkedIn invite',
            body: 'I just sent you an invite on LinkedIn. Let’s connect!',
            isRead: false,
            sentAt: 1651649930594,
            removedAt: null,
            from: 'networker@prosocial.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651661930500,
            subject: 'Grocery list',
            body: 'Need anything else before I go to the store?',
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'partner@home.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651673930500,
            subject: 'Important tax info',
            body: 'Your tax documents for the year are ready to download.',
            isRead: true,
            sentAt: 1651673930594,
            removedAt: null,
            from: 'tax@government.org',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651685930500,
            subject: 'Welcome to the team!',
            body: 'We’re excited to have you onboard. Here’s what to do next.',
            isRead: true,
            sentAt: 1651685930594,
            removedAt: null,
            from: 'onboarding@company.com',
            to: 'user@appsus.com',
            isStared: true
        },
        {
            id: utilService.makeId(),
            createdAt: 1651697930500,
            subject: 'Out of Office',
            body: 'I’m currently out of office and will reply next week.',
            isRead: false,
            sentAt: 1651697930594,
            removedAt: null,
            from: 'janet@bizmail.com',
            to: 'user@appsus.com',
            isStared: false
        },
        {
            id: utilService.makeId(),
            createdAt: 1651709930500,
            subject: 'Thanks for your help!',
            body: 'Couldn’t have done it without you — much appreciated.',
            isRead: true,
            sentAt: 1651709930594,
            removedAt: null,
            from: 'client@agency.com',
            to: 'user@appsus.com',
            isStared: true
        }

    ]



}