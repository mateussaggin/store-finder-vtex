import { defineMessages } from 'react-intl'
import {
    MASTERDATA_BASE_URL,
    MASTERDATA_DEFAULT_ACRONYM,
    MASTERDATA_DEFAULT_IMAGE_FIELD,
} from '../constants/'

const baseI18n = 'store.form.headers.'

const messages = defineMessages({
    logo: { id: `${baseI18n}logo`, defaultMessage: '' },
    companyName: { id: `${baseI18n}companyName`, defaultMessage: '' },
    country: { id: `${baseI18n}country`, defaultMessage: '' },
    segment: { id: `${baseI18n}segment`, defaultMessage: '' },
    type: { id: `${baseI18n}type`, defaultMessage: '' },
    comission: { id: `${baseI18n}comission`, defaultMessage: '' },
})

const getImageUrl = (id, filename) => {
    return `${MASTERDATA_BASE_URL}/${MASTERDATA_DEFAULT_ACRONYM}/documents/${id}/${MASTERDATA_DEFAULT_IMAGE_FIELD}/attachments/${filename}`
}

export const storesSchema = ({
    intl
}) => {
    const schema = {
        properties: {
            logo: {
                sortable: false,
                title: intl.formatMessage(messages.logo),
                cellRenderer: ({ rowData }) => {
                    const href = getImageUrl(rowData.id, rowData.logo)
                    return <img width="75" height="75" src={href} />
                }
            },
            companyName: {
                sortable: true,
                type: 'string',
                title: intl.formatMessage(messages.companyName),
                width: 250
            },
            country: {
                sortable: true,
                type: 'string',
                title: intl.formatMessage(messages.country)
            },
            segment: {
                sortable: true,
                type: 'string',
                title: intl.formatMessage(messages.segment),
            },
            type: {
                sortable: true,
                type: 'string',
                title: intl.formatMessage(messages.type),
                width: 100
            },
            comission: {
                sortable: true,
                type: 'string',
                title: intl.formatMessage(messages.comission)
            }
        },
    }

    return schema
}
