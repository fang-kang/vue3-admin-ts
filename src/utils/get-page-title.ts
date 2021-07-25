/*
 * @Descripttion: 
 * @Author: 房康
 * @Date: 2021-07-24 22:51:05
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
