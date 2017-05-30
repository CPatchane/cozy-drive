import styles from '../../../styles/toolbar'

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { translate } from '../../../lib/I18n'

import UploadButton from '../../../components/UploadButton'
import Menu, { Item } from '../../../components/Menu'

import { showSelectionBar } from '../../../actions'
import { mustShowSelectionBar } from '../../../reducers'

import { COZY_PHOTOS_DIR_ID } from '../../../constants/config'
import { addToUploadQueue } from '../../upload'
import { addPhotosToTimeline } from '../'

import classNames from 'classnames'

export const Toolbar = ({ t, disabled = false, uploadPhotos, deleteAlbum, selectItems, params }) => (
  <div className={styles['pho-toolbar']} role='toolbar'>
    <UploadButton
      className='coz-desktop'
      onUpload={uploadPhotos}
      disabled={disabled}
      label={t('Toolbar.photo_upload')}
    />
    <Menu
      title={t('toolbar.item_more')}
      disabled={disabled}
      className={styles['pho-toolbar-menu']}
      buttonClassName={styles['pho-toolbar-more-btn']}
    >
      <Item>
        <UploadButton
          onUpload={uploadPhotos}
          disabled={disabled}
          label={t('Toolbar.menu.photo_upload')}
          type='menu-item'
        />
      </Item>
      <hr />
      <Item>
        <a className={classNames(styles['pho-action-select'], 'coz-mobile')} onClick={selectItems}>
          {t('Toolbar.menu.select_items')}
        </a>
      </Item>
    </Menu>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
  disabled: mustShowSelectionBar(state)
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  uploadPhotos: photos =>
    dispatch(addToUploadQueue(photos, COZY_PHOTOS_DIR_ID, photo => addPhotosToTimeline([photo]))),
  selectItems: () => dispatch(showSelectionBar())
})

export default withRouter(translate()(connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)))
