/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'


export function AsideMenuMain() {
  const intl = useIntl()
  

  return (
    <>
      {/* <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      /> */}
      {/* <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      
      
      {/* <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub> */}

      {/* Admin modules.. */}
      {/* <AsideMenuItemWithSub
        to='/admin/adminpages'
        title='News'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItem  hasBullet={true} to={''} title={''} >
        
        </AsideMenuItem>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      

      {/* Qurated Containts.. */}

      {/* <AsideMenuItemWithSub
        to='/admin/adminpages'
        title='QuratedContaints'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/admin/adminpages/newscreate' title='Create' hasBullet={true} />
        <AsideMenuItem to='/admin/adminpages/newslist' title='List' hasBullet={true} />
      </AsideMenuItemWithSub> */}


      {/* <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Admin Module</span>
        </div>
      </div> */}
      {/* <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub> */}

      {/* Admin.. */}
      {/* <AsideMenuItemWithSub
        to='/apps/admin'
        title='Admin'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/admin/category-page' title='Category Page' hasBullet={true} />
        <AsideMenuItem to='/apps/admin/news-page' title='News Page' hasBullet={true} />
        <AsideMenuItem to='/apps/admin/list-page' title='List Page' hasBullet={true} />
      </AsideMenuItemWithSub> */}

      {/* News..

      <AsideMenuItemWithSub
        to='/apps/category'
        title='News'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/category/news-page' title='News Page' hasBullet={true} />
      </AsideMenuItemWithSub>

      List..

      <AsideMenuItemWithSub
        to='/apps/category'
        title='List'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/category/list-page' title='List Page' hasBullet={true} />
      </AsideMenuItemWithSub> */}
      
      {/* <AsideMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      />  */}
      <AsideMenuItem
        to='/apps/news-management/news'
        icon='/media/icons/duotune/general/gen051.svg'
        title='News management'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/cms-management/cms'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Cms management'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/qrated-content-management/qrated-content'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Curated content management'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/apps/category-management/category'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Category management'
        fontIcon='bi-layers'
      />
      <AsideMenuItemWithSub
        to='/crafted/account'
        title='Account'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/settings' title='Change Password' hasBullet={true} />
      </AsideMenuItemWithSub>

    </>
  )
}
